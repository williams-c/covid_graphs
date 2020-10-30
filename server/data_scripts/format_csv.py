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

def total_cases_by_state(start, end, states):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_state(df, start, end, states)
  df.index.names=['Date']
  df.to_csv('total_cases_state.csv')
  return df

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

def total_cases_by_county(start, end, state, counties):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_county(df, start, end, state, counties)
  df.index.names=['Date']
  df.to_csv('total_cases_county.csv')
  return df

# print(daily_cases_by_state('2020-09-15', '2020-10-29', ['Colorado', 'Utah', 'Kansas', 'Wyoming', 'New Mexico'], 'D'))
# print(total_cases_by_state('2020-09-15', '2020-10-15', ['Colorado', 'Utah', 'Kansas', 'Wyoming', 'New Mexico']))

print(daily_cases_by_county('2020-03-15', '2020-10-15', 'Colorado', ['Boulder', 'Arapahoe', 'Weld'], 'W'))
