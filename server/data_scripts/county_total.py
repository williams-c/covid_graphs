import pandas as pd
from format_csv import format_csv_by_county

def total_cases_by_county(start, end, state, counties):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_county(df, start, end, state, counties)
  df.index.names=['Date']
  df.to_csv('total_cases_county.csv')
  return df