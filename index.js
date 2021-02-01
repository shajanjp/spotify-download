const playList = require("./playlist.json");
const yts = require("yt-search");
const youtubedl = require("youtube-dl");

const songs = playList.items.map((item) => {
  return `${formatTrackName(item?.track?.name)} - ${formatTrackName(
    item?.track?.album?.name
  )}`;
});

function formatTrackName(trackName) {
  return trackName.split("From")[0]?.replace(/-/g, "").trim();
}

(async () => {
  for (const song of songs) {
    const youtubeResult = await yts(song);
    console.log({
      url: youtubeResult.videos[0].url,
      title: youtubeResult.videos[0].title,
    });
    await downloadYoutubeMedia(youtubeResult.videos[0].url);
  }
})();

function downloadYoutubeMedia(url) {
  return new Promise((resolve, reject) => {
    youtubedl.exec(
      url,
      ["-x", "--audio-format", "mp3"],
      {},
      function (err, output) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}
