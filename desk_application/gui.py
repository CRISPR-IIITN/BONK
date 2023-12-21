import tkinter as tk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from datetime import datetime
import time

def show_graph():
    def read_data():
        timestamps = []
        download_speeds = []
        upload_speeds = []
        with open("D:\\Code\\CRISPR\\bonk\\desk_application\\speed_data.txt", "r") as file:
            for line in file:
                data = line.strip().split(" | ")
                timestamp = datetime.strptime(data[0], "%Y-%m-%d %H:%M:%S")
                timestamps.append(timestamp)
                download_speed = float(data[1].split(":")[1].strip().split(" ")[0])
                upload_speed = float(data[2].split(":")[1].strip().split(" ")[0])
                download_speeds.append(download_speed)
                upload_speeds.append(upload_speed)
        return timestamps, download_speeds, upload_speeds

    def reload_graph():
        timestamps, download_speeds, upload_speeds = read_data()

        # Clear the existing graph
        ax.clear()

        # Plotting speeds in a line graph
        ax.plot(timestamps, download_speeds, marker='o', label='Download Speed')
        ax.plot(timestamps, upload_speeds, marker='o', label='Upload Speed')
        ax.set_ylabel('Speed (Mbps)')
        ax.set_xlabel('Timestamp')
        ax.set_title('Download and Upload Speeds Over Time')
        ax.legend()

        canvas.draw()

    timestamps, download_speeds, upload_speeds = read_data()

    fig, ax = plt.subplots()
    ax.plot(timestamps, download_speeds, marker='o', label='Download Speed')
    ax.plot(timestamps, upload_speeds, marker='o', label='Upload Speed')
    ax.set_ylabel('Speed (Mbps)')
    ax.set_xlabel('Timestamp')
    ax.set_title('Download and Upload Speeds Over Time')
    ax.legend()

    window = tk.Tk()
    window.title("Network Speed Graph")
    canvas = FigureCanvasTkAgg(fig, master=window)
    canvas.draw()
    canvas.get_tk_widget().pack()
    reload_button = tk.Button(window, text="Reload", command=reload_graph)
    reload_button.pack()

    window.mainloop()

show_graph()
