import pandas as pd
from format_csv import format_csv_by_county

def daily_cases_by_county(start, end, state, counties, interval):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_county(df, start, end, state, counties)
  # aggregates between weeks instead of days
  df = df.diff()
  df = df.resample('1' + interval).sum()
  #removes first and last row
  df.drop(df.head(1).index,inplace=True)
  df.drop(df.tail(1).index,inplace=True)
  df.index.names=['Date']
  df.to_csv('daily_cases_county.csv')
  return df
