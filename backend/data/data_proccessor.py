import pandas as pd
from pathlib import Path

# Load the dataset
# input_file = 'agri_dataset_completed.csv'  # Change path if needed
input_file = Path(__file__).parent / "agri_dataset_completed.csv"
df = pd.read_csv(input_file)

# Remove duplicate rows
df_cleaned = df.drop_duplicates()

# Save to a new file
output_file = 'output.csv'
df_cleaned.to_csv(output_file, index=False)

print(f"Cleaned dataset saved to {output_file} with {len(df_cleaned)} rows.")

