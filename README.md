# and-node
node.js server -> android lean   
   
라면 끓이기 소캣 통신 -   
server(socket)
order로 emit을 받으면 (on) 클라이언트 배열을 하나 만들면서 요리 시작.   
진행 상황을 getState로 emit (state : 사진 URL)   

   
동영상 스트리밍 서버 -   
server(HLS) : http로 hls파일 형식을 전달(m3u8) 
node ffmpegEncoding를 먼저 실행시켜 mp4파일을 hls파일로 인코딩 
인덱스론 html(웹) 테스트. /test로 m3u8파일 전달 
 
rtsp 서버는 ./rtsp-simple-server 로 실행. (rtsp://localhost:8554/mystream)
