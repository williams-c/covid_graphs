import pandas as pd

def format_csv_by_state(df, start, end, states):
  df.rename(columns={'Province_State': 'State'}, inplace=True)
  df = df.drop(columns=['UID', 'code3', 'iso2', 'iso3', 'FIPS', 'Lat', 'Long_'])
  df = df.groupby('State').agg('sum')
  # flips columns and rows
  df = df.T
  # turns date from string to pandas datetime
  df_time = pd.to_datetime(df.index)
  datetime_index = pd.DatetimeIndex(df_time.values)
  df = df.set_index(datetime_index)
  df = df[start:end]
  df = df[states]
  return df

def daily_cases_by_state(start, end, states, interval):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_state(df, start, end, states)
  df = df.diff()
  df = df.resample('1' + interval).sum()
  #removes first and last row
  df.drop(df.head(1).index,inplace=True)
  df.drop(df.tail(1).index,inplace=True)
  fig = df.plot()
  fig = fig.get_figure()
  fig.savefig('states_figure.pdf')
  df.to_csv('daily_cases_state.csv')
  return df

def total_cases_by_state(start, end, states):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_state(df, start, end, states)
  fig = df.plot()
  fig = fig.get_figure()
  fig.savefig('total_state_figure.pdf')
  df.to_json('total_cases_state.json')
  return df

def format_csv_by_county(df, start, end, state, counties):
  df.rename(columns={'Admin2': 'County'}, inplace=True)
  df = df.drop(columns=['UID', 'code3', 'iso2', 'iso3', 'FIPS', 'Lat', 'Long_', 'Country_Region', 'Combined_Key'])
  df.columns
  df = df[df['Province_State'] == state]
  df = df.groupby('County').agg('sum')
  # flips columns and rows
  df = df.T
  # turns date from string to pandas datetime
  df_time = pd.to_datetime(df.index)
  datetime_index = pd.DatetimeIndex(df_time.values)
  df = df.set_index(datetime_index)
  df = df[start:end]
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
  fig = df.plot()
  fig = fig.get_figure()
  fig.savefig('county_figure.pdf')
  df.to_csv('daily_cases_county.csv')
  return df

def total_cases_by_county(start, end, state, counties):
  df = pd.read_csv(f'time_series_covid19_confirmed_US.csv')
  df = format_csv_by_county(df, start, end, state, counties)
  fig = df.plot()
  fig = fig.get_figure()
  fig.savefig('total_county_figure.pdf')
  df.to_csv('total_cases_county.csv')
  return df

print(daily_cases_by_state('2020-09-15', '2020-10-29', ['Colorado', 'Utah', 'Kansas', 'Wyoming', 'New Mexico'], 'D'))
print(total_cases_by_state('2020-09-15', '2020-10-15', ['Colorado', 'Utah', 'Kansas', 'Wyoming', 'New Mexico']))

# print(total_cases_by_county('2020-03-15', '2020-10-15', 'Colorado', ['Boulder', 'Arapahoe', 'Weld'], 'W'))
