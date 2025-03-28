import os
import shutil
from sklearn.model_selection import train_test_split

# Hardcoded paths - NO CONFIG NEEDED
RAW_PATH = 'data/raw/Riped and Unriped Tomato Dataset'
PROCESSED_PATH = 'data/processed'
TEST_SIZE = 0.15  # 15% test, 15% val, 70% train

os.makedirs(f'{PROCESSED_PATH}/train/Riped', exist_ok=True)
os.makedirs(f'{PROCESSED_PATH}/val/Riped', exist_ok=True)
os.makedirs(f'{PROCESSED_PATH}/test/Riped', exist_ok=True)
os.makedirs(f'{PROCESSED_PATH}/train/Unriped', exist_ok=True)
os.makedirs(f'{PROCESSED_PATH}/val/Unriped', exist_ok=True)
os.makedirs(f'{PROCESSED_PATH}/test/Unriped', exist_ok=True)

for class_name in ['Riped', 'Unriped']:
    files = os.listdir(f'{RAW_PATH}/{class_name}')
    train_files, test_files = train_test_split(files, test_size=TEST_SIZE*2, random_state=42)
    train_files, val_files = train_test_split(train_files, test_size=TEST_SIZE, random_state=42)
    
    for f in train_files:
        shutil.copy(f'{RAW_PATH}/{class_name}/{f}', f'{PROCESSED_PATH}/train/{class_name}/{f}')
    for f in val_files:
        shutil.copy(f'{RAW_PATH}/{class_name}/{f}', f'{PROCESSED_PATH}/val/{class_name}/{f}')
    for f in test_files:
        shutil.copy(f'{RAW_PATH}/{class_name}/{f}', f'{PROCESSED_PATH}/test/{class_name}/{f}')