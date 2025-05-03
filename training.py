import pandas as pd
df = pd.read_excel("C:\Robo-chat\data\data-pegawai.xlsx")
df.head()
from sklearn.preprocessing import LabelEncoder
import joblib

# Verify if the 'State' column is a categorical string type
if df['state'].dtype == 'object':
    label_encoder = LabelEncoder()
    df['state'] = label_encoder.fit_transform(df['state'])  # Encoding categorical labels into numeric labels

# Save the LabelEncoder for future use
joblib.dump(label_encoder, 'label_encoder_random1.pkl')

# Print the dataframe
print(df)

# Now you can proceed with scaling or other operations


# Ensure all columns to be scaled are numeric
df[['bars', 'kpi', 'selisih', 'posisi']] = df[['bars', 'kpi', 'selisih', 'posisi']].apply(pd.to_numeric, errors='coerce')

# Scale the data
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df[['bars', 'kpi', 'selisih', 'posisi']] = scaler.fit_transform(df[['bars', 'kpi', 'selisih', 'posisi']])

# Saving the scaler
joblib.dump(scaler, 'scaler_random1.pkl')

# Print the data
print(df)

# Duplicate the data
df = pd.concat([df] * 50, ignore_index=True)

# Define the features (X) and target (y)
X = df[['bars', 'kpi', 'selisih', 'posisi']]
y = df['state']

import xgboost as xgb
from sklearn.preprocessing import StandardScaler

# Membuat dan melatih model XGBoost
model = xgb.XGBClassifier(objective='multi:softmax', num_class=3, random_state=42)  # Update num_class based on your classes
model.fit(X, y)

# Prediksi untuk input manual
prediksi_hasil = model.predict(X)

# Probabilitas untuk input manual
prediksi_probabilitas = model.predict_proba(X)

# Menampilkan hasil prediksi
print(f"Prediksi state untuk input tersebut adalah: {prediksi_hasil[61]}")

# Menampilkan probabilitas untuk input tersebut
print(f"Probabilitas untuk setiap kelas adalah: {prediksi_probabilitas[61]}")

# reverse label encoding
prediksi_label = label_encoder.inverse_transform(prediksi_hasil)
print(f"Prediksi state untuk input tersebut adalah: {prediksi_label[61]}")

# save the model
joblib.dump(model, 'model.pkl')

# XGB importance
import matplotlib.pyplot as plt
xgb.plot_importance(model)  
plt.show()