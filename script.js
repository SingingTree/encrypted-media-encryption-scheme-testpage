/**
* Programmatically setup our event handlers and get the page ready.
*/
function setupPage() { // eslint-disable-line no-unused-vars
  // Scheme selection check boxes
  let cenc = document.getElementById("cenc");
  let cbcs = document.getElementById("cbcs");

  // Supported configurations text area
  let supportedConfigurationsText =
      document.getElementById("supportedConfigurations");

  // Response/error text area
  let responseText = document.getElementById("response");

  // Used to grow text areas so users don't have to manually resize
  function growTextArea(textArea) {
    textArea.style.height = "5px"; // Make sure the area shrinks if needed.
    textArea.style.height = textArea.scrollHeight + "px"; // Grow as needed.
  }

  /**
  * Builds the supported configurations JSON and populates the
  * supportedConfigurationsText text area with it.
  */
  function buildSupportedConfigurations() {
    // Hardcode robustness and contentType as these aren't what we're testing.
    const robustness = "";
    const contentType = "video/mp4;codecs=\"avc1.42e01e\"";
    let mediaKeySystemConfig =
    {
      "initDataTypes": ["cenc"],
      "audioCapabilities": [],
      // We add video caps below
    };

    if (!cenc.checked && !cbcs.checked) {
      // No scheme selected, build without
      mediaKeySystemConfig.videoCapabilities = [{
       "robustness": robustness,
       "contentType": contentType,
      }];
    } else {
      mediaKeySystemConfig.videoCapabilities = [];
      if (cenc.checked) {
        mediaKeySystemConfig.videoCapabilities.push({
          "robustness": robustness,
          "contentType": contentType,
          "encryptionScheme": "cenc",
        });
      }
      if (cbcs.checked) {
        mediaKeySystemConfig.videoCapabilities.push({
          "robustness": robustness,
          "contentType": contentType,
          "encryptionScheme": "cbcs",
        });
      }
    }

    supportedConfigurationsText.value =
      JSON.stringify(mediaKeySystemConfig, null, 2);
    growTextArea(supportedConfigurationsText);
  }
  
  async function submitRequest() {
     // Key system radio buttons
    let clearkey = document.getElementById("clearkey");
    let playready = document.getElementById("playready");
    let widevine = document.getElementById("widevine");

    let keySystem = clearkey.checked ? "org.w3.clearkey" :
                    playready.checked ? "com.microsoft.playready" :
                    widevine.checked ? "com.widevine.alpha" :
                    null;

    let mediaKeySystemConfig =
      JSON.parse(supportedConfigurationsText.value);

      try {
        let mediaKeySystemAccess = await navigator.requestMediaKeySystemAccess(
          keySystem, [mediaKeySystemConfig])
          responseText.value =
            JSON.stringify(mediaKeySystemAccess.getConfiguration(), null, 2);
      } catch (e) {
        responseText.value = e;
      }
      growTextArea(responseText);
  }

  cenc.onclick = buildSupportedConfigurations;
  cbcs.onclick = buildSupportedConfigurations;

  document.getElementById("requestAccess").onclick = submitRequest;
  buildSupportedConfigurations();
  growTextArea(responseText);
}