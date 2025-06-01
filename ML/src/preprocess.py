import os
import shutil
import random
import numpy as np
import pandas as pd
from PIL import Image
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def prepare_dataset(base_path, output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    for category in os.listdir(base_path):
        src_path = os.path.join(base_path, category)
        dest_path = os.path.join(output_path, category)
        if os.path.isdir(src_path):
            shutil.copytree(src_path, dest_path, dirs_exist_ok=True)

def split_data(dataset_path):
    file_name, labels, full_path = [], [], []
    for path, subdirs, files in os.walk(dataset_path):
        for name in files:
            full_path.append(os.path.join(path, name))
            labels.append(path.split('/')[-1])
            file_name.append(name)

    df = pd.DataFrame({"path": full_path, 'file_name': file_name, "labels": labels})
    X, y = df['path'], df['labels']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=300)
    df_tr = pd.DataFrame({'path': X_train, 'labels': y_train, 'set': 'train'})
    df_te = pd.DataFrame({'path': X_test, 'labels': y_test, 'set': 'test'})
    df_all = pd.concat([df_tr, df_te], ignore_index=True)
    return df_all

def save_split_data(df_all, dataset_path, output_path):
    for _, row in df_all.iterrows():
        src = row['path']
        dst = os.path.join(output_path, row['set'], row['labels'])
        os.makedirs(dst, exist_ok=True)
        shutil.copy2(src, os.path.join(dst, os.path.basename(src)))

def create_generators(train_dir):
    datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
    train_gen = datagen.flow_from_directory(
        train_dir, target_size=(150, 150), batch_size=32,
        class_mode='binary', subset='training', shuffle=True
    )
    val_gen = datagen.flow_from_directory(
        train_dir, target_size=(150, 150), batch_size=32,
        class_mode='binary', subset='validation', shuffle=False
    )
    return train_gen, val_gen
