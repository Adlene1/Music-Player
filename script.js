document.addEventListener('DOMContentLoaded', function() {
            // Player elements
            const audio = new Audio();
            const playBtn = document.getElementById('play-btn');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const progressBar = document.getElementById('progress-bar');
            const progressContainer = document.getElementById('progress-container');
            const currentTimeEl = document.getElementById('current-time');
            const durationEl = document.getElementById('duration');
            const volumeSlider = document.getElementById('volume-slider');
            const songTitle = document.getElementById('song-title');
            const songArtist = document.getElementById('song-artist');
            const albumArt = document.getElementById('album-art');
            const playlistEl = document.getElementById('playlist');
            
            // Playlist
            const playlist = [
                {
                    title: "title 1",
                    artist: "artist 1",
                    src: "",
                    cover: ""
                },
                {
                    title: "title 2",
                    artist: "artist 2",
                    src: "",
                    cover: ""
                },
                {
                    title: "title 3",
                    artist: "artist 3",
                    src: "",
                    cover: ""
                }
            ];
            
            let currentSongIndex = 0;
            let isPlaying = false;
            
            // Initialize player
            function initPlayer() {
                loadSong(playlist[currentSongIndex]);
                renderPlaylist();
                
                // Event listeners
                playBtn.addEventListener('click', togglePlay);
                prevBtn.addEventListener('click', prevSong);
                nextBtn.addEventListener('click', nextSong);
                audio.addEventListener('timeupdate', updateProgress);
                audio.addEventListener('ended', nextSong);
                audio.addEventListener('loadedmetadata', updateDuration);
                progressContainer.addEventListener('click', setProgress);
                volumeSlider.addEventListener('input', setVolume);
            }
            
            // Load song
            function loadSong(song) {
                audio.src = song.src;
                songTitle.textContent = song.title;
                songArtist.textContent = song.artist;
                albumArt.src = song.cover;
                
                // Update active playlist item
                const playlistItems = document.querySelectorAll('.playlist-item');
                playlistItems.forEach(item => item.classList.remove('active'));
                playlistItems[currentSongIndex].classList.add('active');
            }
            
            // Play/pause
            function togglePlay() {
                if (isPlaying) {
                    pauseSong();
                } else {
                    playSong();
                }
            }
            
            function playSong() {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                audio.play();
            }
            
            function pauseSong() {
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                audio.pause();
            }
            
            // Previous song
            function prevSong() {
                currentSongIndex--;
                if (currentSongIndex < 0) {
                    currentSongIndex = playlist.length - 1;
                }
                loadSong(playlist[currentSongIndex]);
                if (isPlaying) {
                    playSong();
                }
            }
            
            // Next song
            function nextSong() {
                currentSongIndex++;
                if (currentSongIndex > playlist.length - 1) {
                    currentSongIndex = 0;
                }
                loadSong(playlist[currentSongIndex]);
                if (isPlaying) {
                    playSong();
                }
            }
            
            // Update progress bar
            function updateProgress(e) {
                const { duration, currentTime } = e.srcElement;
                const progressPercent = (currentTime / duration) * 100;
                progressBar.style.width = ${progressPercent}%;
                
                // Update time display
                currentTimeEl.textContent = formatTime(currentTime);
            }
            
            // Update duration
            function updateDuration() {
                durationEl.textContent = formatTime(audio.duration);
            }
            
            // Format time
            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return ${mins}:${secs < 10 ? '0' : ''}${secs};
            }
            
            // Set progress
            function setProgress(e) {
                const width = this.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                audio.currentTime = (clickX / width) * duration;
            }
            
            // Set volume
            function setVolume() {
                audio.volume = this.value;
            }


// Render playlist
            function renderPlaylist() {
                playlistEl.innerHTML = '';
                playlist.forEach((song, index) => {
                    const songEl = document.createElement('div');
                    songEl.classList.add('playlist-item');
                    if (index === currentSongIndex) {
                        songEl.classList.add('active');
                    }
                    songEl.innerHTML = 
                        <strong>${song.title}</strong> - ${song.artist}
                    ;
                    songEl.addEventListener('click', () => {
                        currentSongIndex = index;
                        loadSong(playlist[currentSongIndex]);
                        playSong();
                    });
                    playlistEl.appendChild(songEl);
                });
            }
            
            // Initialize
            initPlayer();
        });