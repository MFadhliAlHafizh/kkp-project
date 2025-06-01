import os
import tensorflow as tf
from tensorflow.keras import Sequential, regularizers
from tensorflow.keras.layers import Conv2D, MaxPool2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping

def build_model():
    model = Sequential()
    model.add(Conv2D(32, (3, 3), padding='same', activation='relu',
                     kernel_regularizer=regularizers.l2(0.001), input_shape=(150, 150, 3)))
    model.add(BatchNormalization())
    model.add(MaxPool2D((2, 2)))

    model.add(Conv2D(32, (4, 4), padding='same', activation='relu',
                     kernel_regularizer=regularizers.l2(0.001)))
    model.add(BatchNormalization())
    model.add(MaxPool2D((2, 2)))

    model.add(Conv2D(32, (7, 7), padding='same', activation='relu',
                     kernel_regularizer=regularizers.l2(0.001)))
    model.add(BatchNormalization())
    model.add(MaxPool2D((2, 2)))

    model.add(Flatten())
    model.add(Dense(128, activation='relu', kernel_regularizer=regularizers.l2(0.001)))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.001)))
    model.add(Dropout(0.3))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(optimizer=tf.keras.optimizers.RMSprop(),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])
    return model

def train_model(model, train_generator, val_generator, train_organik, train_anorganik):
    count_organik = len(os.listdir(train_organik))
    count_anorganik = len(os.listdir(train_anorganik))

    weight_0 = (1 / count_organik) * (count_organik + count_anorganik) / 2.0
    weight_1 = (1 / count_anorganik) * (count_anorganik + count_organik) / 2.0
    class_weights = {0: weight_0, 1: weight_1}

    early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

    history = model.fit(
        train_generator,
        epochs=30,
        validation_data=val_generator,
        class_weight=class_weights,
        callbacks=[early_stop]
    )
    return model, history
