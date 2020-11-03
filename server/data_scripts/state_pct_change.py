import sys
import pandas as pd
from format_state import format_csv_by_state

def daily_pct_change_by_state(start, end, states):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = format_csv_by_state(df, start, end, states)
  df = df.pct_change()
  #removes first and last row
  df.drop(df.head(1).index,inplace=True)
  df.drop(df.tail(1).index,inplace=True)
  df.index.names=['Date']
  df.to_csv('pct_change_state.csv')
  return df

statesArray = sys.argv[3]
if statesArray != 'all':
  statesArray = []
  for i in range (3, len(sys.argv)):
    statesArray.append(sys.argv[i])

daily_pct_change_by_state(sys.argv[1], sys.argv[2], statesArray)

