import sys
import pandas as pd
from format_state import format_csv_by_state

def total_cases_by_state(start, end, states):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = format_csv_by_state(df, start, end, states)
  df.index.names=['Date']
  output = df.to_csv()
  print(output)
  sys.stdout.flush()

statesArray = sys.argv[3]
if statesArray != 'all':
  statesArray = []
  for i in range (3, len(sys.argv)):
    statesArray.append(sys.argv[i])

total_cases_by_state(sys.argv[1], sys.argv[2], statesArray)