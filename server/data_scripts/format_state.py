import pandas as pd

def format_csv_by_state(df, start, end, states):
  df = df.drop(columns=['UID', 'code3', 'iso2', 'iso3', 'FIPS', 'Lat', 'Long_'])
  df = df.groupby('Province_State').agg('sum')
  # flips columns and rows
  df = df.T
  # turns date from string to pandas datetime
  df_time = pd.to_datetime(df.index)
  datetime_index = pd.DatetimeIndex(df_time.values)
  df = df.set_index(datetime_index)
  # select between start and end dates
  df = df[start:end]
  # select specific states
  df = df[states]
  return df