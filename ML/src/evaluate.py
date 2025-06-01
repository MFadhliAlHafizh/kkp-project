import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

def plot_training(history):
    acc = history.history['accuracy']
    val_acc = history.history['val_accuracy']
    loss = history.history['loss']
    val_loss = history.history['val_loss']
    epochs = range(len(acc))

    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.plot(epochs, acc, 'r', label='Train')
    plt.plot(epochs, val_acc, 'b', label='Validation')
    plt.title('Training and Validation Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(epochs, loss, 'r', label='Train')
    plt.plot(epochs, val_loss, 'b', label='Validation')
    plt.title('Training and Validation Loss')
    plt.legend()
    plt.tight_layout()
    plt.show()

def evaluate_model(model, test_generator):
    test_generator.reset()
    preds = model.predict(test_generator)
    preds[preds <= 0.5] = 0
    preds[preds > 0.5] = 1

    cm = pd.DataFrame(confusion_matrix(test_generator.classes, preds.astype(int)),
                      index=["Actual Organik", "Actual Anorganik"],
                      columns=["Predicted Organik", "Predicted Anorganik"])
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.title("Confusion Matrix")
    plt.show()

    print("\nClassification Report:\n")
    print(classification_report(test_generator.classes, preds.astype(int),
                                target_names=['Organik', 'Anorganik'], digits=4))
