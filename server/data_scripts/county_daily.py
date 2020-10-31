import sys
import pandas as pd
from format_counties import format_csv_by_county

def daily_cases_by_county(start, end, state, interval, counties):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
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

#get counties arguments
countiesArray = []
for i in range (5, len(sys.argv)):
  countiesArray.append(sys.argv[i])

daily_cases_by_county(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], countiesArray)
