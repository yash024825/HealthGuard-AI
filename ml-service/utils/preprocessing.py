import numpy as np
import pandas as pd


def dataframe_to_numpy(df: pd.DataFrame):
    """
    Convert a pandas DataFrame to a NumPy array.
    """
    return df.to_numpy()


def reshape_features(features):
    """
    Reshape a single prediction sample into the format expected by scikit-learn.
    """
    return np.array(features).reshape(1, -1)


def fill_missing_values(df: pd.DataFrame):
    """
    Fill missing numeric values with the median.
    """
    numeric_columns = df.select_dtypes(include=["number"]).columns

    for column in numeric_columns:
        df[column] = df[column].fillna(df[column].median())

    return df


def remove_duplicates(df: pd.DataFrame):
    """
    Remove duplicate rows from a DataFrame.
    """
    return df.drop_duplicates()


def normalize_column_names(df: pd.DataFrame):
    """
    Standardize column names.
    """
    df.columns = (
        df.columns.str.strip()
                  .str.lower()
                  .str.replace(" ", "_")
    )

    return df