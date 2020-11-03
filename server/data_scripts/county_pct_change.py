import sys
import pandas as pd
from format_counties import format_csv_by_county

def daily_pct_change_by_county(start, end, state, counties):
  df = pd.read_csv(f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
  df = format_csv_by_county(df, start, end, state, counties)
  df = df.pct_change()
  #removes first and last row
  df.drop(df.head(1).index,inplace=True)
  df.drop(df.tail(1).index,inplace=True)
  df.index.names=['Date']
  df.to_csv('pct_change_county.csv')
  return df

countiesArray = sys.argv[4]
if countiesArray != 'all':
  countiesArray = []
  for i in range (4, len(sys.argv)):
    countiesArray.append(sys.argv[i])

daily_pct_change_by_county(sys.argv[1], sys.argv[2], sys.argv[3], countiesArray)

