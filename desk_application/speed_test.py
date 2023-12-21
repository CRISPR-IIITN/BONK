from speedtest import Speedtest
import schedule
import time
from datetime import datetime
import os

def run_speed_test_and_store():
    st = Speedtest()
    st.get_best_server()
    download_speed = st.download() / 1_000_000  # Mbps
    upload_speed = st.upload() / 1_000_000  # Mbps
    
    # Specify the absolute path of the file
    file_path = os.path.abspath("D:\\Code\\CRISPR\\bonk\\speed_data.txt")
    
    # Store data in a text file with timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(file_path, "a") as file:
        file.write(f"{timestamp} | Download: {download_speed:.2f} Mbps | Upload: {upload_speed:.2f} Mbps\n")
    print("speed test conducted \n")
    

# Schedule speed test every 5 minutes
schedule.every(30).seconds.do(run_speed_test_and_store)

# Run the schedule continuously
while True:
    schedule.run_pending()
    print("going to sleep")
    time.sleep(1)
