import pandas as pd
from format_csv import format_csv_by_state

def daily_cases_by_state(start, end, states, interval):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  print(df)
  df = format_csv_by_state(df, start, end, states)
  df = df.diff()
  df = df.resample('1' + interval).sum()
  #removes first and last row
  df.drop(df.head(1).index,inplace=True)
  df.drop(df.tail(1).index,inplace=True)
  df.index.names=['Date']
  df.to_csv('daily_cases_state.csv')
  return df

