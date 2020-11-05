import sys
import pandas as pd
from format_state import format_csv_by_state

def daily_cases_by_state(start, end, interval, states):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = format_csv_by_state(df, start, end, states)
  df = df.diff()
  df = df.resample('1' + interval).sum()
  #removes first and last row
  df.drop(df.head(1).index,inplace=True)
  df.drop(df.tail(1).index,inplace=True)
  df.index.names=['Date']
  output = df.to_csv()
  print(output)
  sys.stdout.flush()

statesArray = sys.argv[4]
if statesArray != 'all':
  statesArray = []
  for i in range (4, len(sys.argv)):
    statesArray.append(sys.argv[i])

daily_cases_by_state(sys.argv[1], sys.argv[2], sys.argv[3], statesArray)
