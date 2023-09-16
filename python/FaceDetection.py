import cv2
from mtcnn import MTCNN
from screeninfo import get_monitors
import socketio
import json
import subprocess

detector = MTCNN()

cmd = 'v4l2-ctl --list-devices'
output = subprocess.check_output(cmd, shell=True).decode('utf-8')
video_devices = [line.strip().split(':')[0] for line in output.split('\n') if '/dev/video' in line]

if video_devices:
    selected_device = video_devices[0]
else:
    raise ValueError("No video devices found.")

cap = cv2.VideoCapture(selected_device)

personCount = 0
eyeCount = 0
prevPersonCount = None

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to the server')

@sio.event
def disconnect():
    print('Disconnected from the server')

sio.connect('http://192.168.3.91:5050')

screen = get_monitors()[0]
screen_width, screen_height = screen.width, screen.height

cv2.namedWindow('Webcam', cv2.WND_PROP_FULLSCREEN)
cv2.setWindowProperty('Webcam', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

while True:
    ret, frame = cap.read()

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    faces = detector.detect_faces(frame_rgb)

    personCount = len(faces)
    eyeCount = 0

    for face in faces:
        x, y, w, h = face['box']
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        left_eye = face['keypoints']['left_eye']
        right_eye = face['keypoints']['right_eye']

        if left_eye and right_eye:
            eyeCount += 2
        elif left_eye or right_eye:
            eyeCount += 1

        cv2.rectangle(frame, (left_eye[0], left_eye[1]), (left_eye[0] + 5, left_eye[1] + 5), (0, 0, 255), 2)
        cv2.rectangle(frame, (right_eye[0], right_eye[1]), (right_eye[0] + 5, right_eye[1] + 5), (0, 0, 255), 2)

    cv2.putText(frame, f'People: {personCount}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.putText(frame, f'Eyes: {eyeCount}', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.imshow('Webcam', frame)

  
    if personCount != prevPersonCount:
        data = {
            "kioskId": 1,
            "personCount": personCount,
            "eyeCount": eyeCount
        }
        sio.emit('kioskViewCount', json.dumps(data))
        prevPersonCount = personCount

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
