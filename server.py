import xgboost as xgb
import joblib
import json
from sklearn.preprocessing import LabelEncoder
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.preprocessing import StandardScaler
import math
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load the trained XGBoost model
model = joblib.load('model.pkl')
# Load the encoder and scaler
label_encoder = joblib.load('label_encoder_random1.pkl')
scaler = joblib.load('scaler_random1.pkl')
# Load the employee data
employee_data = pd.read_excel('data/data-pegawai.xlsx')

# Print debug information
print("Columns in the data:", employee_data.columns.tolist())
print("\nFirst few rows of data:")
print(employee_data.head())
print("\nSample employee IDs:")
print(employee_data['id'].head(10).tolist())

# Position hierarchy mapping
POSITION_HIERARCHY = {
    'general manager': 1,
    'senior manager': 2,
    'middle manager': 3,
    'junior manager': 4,
    'team leader': 5,
    'staff': 6
}

# State to position mapping
STATE_TO_POSITION = {
    'promosi': lambda pos: POSITION_NAMES[POSITION_HIERARCHY[pos] - 1] if POSITION_HIERARCHY[pos] > 1 else pos,
    'mutasi': lambda pos: POSITION_NAMES[POSITION_HIERARCHY[pos] + 1] if POSITION_HIERARCHY[pos] < 6 else pos,
    'tetap': lambda pos: pos
}

# Reverse mapping for position numbers to names
POSITION_NAMES = {v: k for k, v in POSITION_HIERARCHY.items()}

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins

def format_position_name(position):
    # Capitalize each word in the position name
    return ' '.join(word.capitalize() for word in position.split())

def get_position_message(current_position, predicted_state, probability):
    current_position = current_position.lower()
    state_upper = predicted_state.upper()
    
    if predicted_state == 'promosi':
        if POSITION_HIERARCHY[current_position] > 1:
            new_position = POSITION_NAMES[POSITION_HIERARCHY[current_position] - 1]
            formatted_position = format_position_name(new_position).upper()
            return f"Karyawan tersebut berpotensi {state_upper} ke posisi {formatted_position} dengan probabilitas {probability}%"
        else:
            formatted_position = format_position_name(current_position).upper()
            return f"Karyawan tersebut berpotensi TETAP di posisi {formatted_position} dengan probabilitas {probability}%"
    elif predicted_state == 'mutasi':
        if POSITION_HIERARCHY[current_position] < 6:
            new_position = POSITION_NAMES[POSITION_HIERARCHY[current_position] + 1]
            formatted_position = format_position_name(new_position).upper()
            return f"Karyawan tersebut berpotensi {state_upper} ke posisi {formatted_position} dengan probabilitas {probability}%"
        else:
            formatted_position = format_position_name(current_position).upper()
            return f"Karyawan tersebut berpotensi TETAP di posisi {formatted_position} dengan probabilitas {probability}%"
    else:  # tetap
        formatted_position = format_position_name(current_position).upper()
        return f"Karyawan tersebut berpotensi {state_upper} di posisi {formatted_position} dengan probabilitas {probability}%"

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        logger.debug("Received prediction request")
        # Get JSON data from the request
        data = request.get_json()
        logger.debug(f"Request data: {data}")
        
        # Check if all required fields are present
        required_fields = ['bars', 'kpi', 'selisih', 'posisi']
        for field in required_fields:
            if field not in data:
                logger.error(f"Missing required field: {field}")
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Validate position
        current_position = data['posisi'].lower()
        if current_position not in POSITION_HIERARCHY:
            logger.error(f"Invalid position: {current_position}")
            return jsonify({'error': 'Invalid position. Valid positions are: general manager, senior manager, middle manager, junior manager, team leader, staff'}), 400

        # Convert position to numeric for scaling
        data['posisi'] = POSITION_HIERARCHY[current_position]

        # Convert data to DataFrame
        df = pd.DataFrame([data])

        # Apply scaling
        df_scaled = df.copy()
        df_scaled[required_fields] = scaler.transform(df_scaled[required_fields])

        # Make prediction
        prediksi_hasil = model.predict(df_scaled)
        prediksi_probabilitas = model.predict_proba(df_scaled)

        # Convert prediction to original label
        predicted_state = label_encoder.inverse_transform(prediksi_hasil)[0]
        
        # Get the highest probability and convert to integer (rounded down)
        highest_probability = int(math.floor(max(prediksi_probabilitas[0]) * 100))

        # Generate the appropriate message
        response_message = get_position_message(current_position, predicted_state, highest_probability)
        logger.debug(f"Prediction result: {response_message}")

        # Return the formatted prediction result
        return jsonify({
            'message': response_message,
            'current_position': current_position,
            'predicted_state': predicted_state,
            'probability': highest_probability
        })

    except Exception as e:
        logger.error(f"Error in prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict_by_id', methods=['POST'])
def predict_by_id():
    try:
        # Get employee ID from the request
        data = request.get_json()
        employee_id = data.get('id')
        
        if not employee_id:
            return jsonify({'error': 'Employee ID is required'}), 400

        # Find employee data
        employee = employee_data[employee_data['id'] == employee_id]
        
        if employee.empty:
            return jsonify({'error': 'Employee not found'}), 404

        # Print debug information
        print("\nEmployee data found:")
        print(employee)
        print("\nAvailable columns:", employee.columns.tolist())

        # Extract features for prediction
        features = employee[['bars', 'kpi', 'selisih', 'posisi']]
        
        # Scale the features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediksi_hasil = model.predict(features_scaled)
        prediksi_probabilitas = model.predict_proba(features_scaled)
        
        # Convert prediction to original label
        prediksi_label = label_encoder.inverse_transform(prediksi_hasil)
        
        # Return the prediction result
        return jsonify({
            'employee_id': employee_id,
            'prediction': prediksi_label[0],
            'probability': prediksi_probabilitas[0].tolist()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)