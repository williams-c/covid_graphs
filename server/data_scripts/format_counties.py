import pandas as pd

def format_csv_by_county(df, start, end, state, counties):
  df = df.drop(columns=['UID', 'code3', 'iso2', 'iso3', 'FIPS', 'Lat', 'Long_', 'Country_Region', 'Combined_Key'])
  df = df.groupby('Admin2').agg('sum')
  # flips columns and rows
  df = df.T
  # turns date from string to pandas datetime
  df_time = pd.to_datetime(df.index)
  datetime_index = pd.DatetimeIndex(df_time.values)
  df = df.set_index(datetime_index)
  # select between start and end dates
  df = df[start:end]
  # select specified counties
  df = df[counties]
  return df