import pandas as pd

def get_states():
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = df['Province_State']
  df = df.drop_duplicates()
  df.to_csv('states_list.csv')
  return df

get_states()

