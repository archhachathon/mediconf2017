function Translator() {
    //needed
    this.voiceToText = function(callback, language) {
        initTranscript(callback, language);
    };

    
    //needed
    this.speakTextUsingGoogleSpeaker = function(args) {
        var textToSpeak = args.textToSpeak;
        var targetLanguage = args.targetLanguage;

        textToSpeak = textToSpeak.replace( /%20| /g , '+');
        if (textToSpeak.substr(0, 1) == ' ' || textToSpeak.substr(0, 1) == '+') {
            textToSpeak = textToSpeak.substr(1, textToSpeak.length - 1);
        }

        var audio_url = 'https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=' + textToSpeak.length + '&tl=' + targetLanguage + '&q=' + textToSpeak;

        if (args.callback) args.callback(audio_url);
        else {
            var audio = document.createElement('audio');
            audio.onerror = function(event) {
                audio.onerror = null;
                audio.src = 'https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=' + textToSpeak.length + '&tl=' + targetLanguage + '&q= ' + textToSpeak;
            };
            audio.src = audio_url;
            audio.autoplay = true;
            audio.play();
        }
    };


    //needed
    this.translateLanguage = function(text, config) {
        config = config || { };
        // please use your own API key; if possible
        var api_key = config.api_key || Google_Translate_API_KEY;

        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';

        var sourceText = encodeURIComponent(text); // escape

        var randomNumber = 'method' + (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
        window[randomNumber] = function(response) {
            if (response.data && response.data.translations[0] && config.callback) {
                config.callback(response.data.translations[0].translatedText);
                return;
            }

            if(response.error && response.error.message == 'Daily Limit Exceeded') {
                config.callback('Google says, "Daily Limit Exceeded". Please try this experiment a few hours later.');
                return;
            }

            if (response.error) {
                console.error(response.error.message);
                return;
            }

            console.error(response);
        };

        var source = 'https://www.googleapis.com/language/translate/v2?key=' + api_key + '&target=' + (config.to || 'en-US') + '&callback=window.' + randomNumber + '&q=' + sourceText;
        newScript.src = source;
        document.getElementsByTagName('head')[0].appendChild(newScript);
    };


    //Needed
    this.getListOfLanguages = function (callback, config) {
        config = config || {};

        var api_key = config.api_key || Google_Translate_API_KEY;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(xhr.responseText);

                if(response && response.data && response.data.languages) {
                    callback(response.data.languages);
                    return;
                }

                if (response.error && response.error.message === 'Daily Limit Exceeded') {
                    console.error('Text translation failed. Error message: "Daily Limit Exceeded."');
                    return;
                }

                if (response.error) {
                    console.error(response.error.message);
                    return;
                }

                console.error(response);
            }
        }
        var url = 'https://www.googleapis.com/language/translate/v2/languages?key=' + api_key + '&target=en';
        xhr.open('GET', url, true);
        xhr.send(null);
    };

    var recognition;

    function initTranscript(callback, language) {
        if (recognition) recognition.stop();

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        recognition = new SpeechRecognition();


        //English by default
        recognition.lang = language || 'en-US';

        console.log('SpeechRecognition Language', recognition.lang);

        recognition.continuous = true;
        recognition.interimResults = true;

        //call whenever machine decides
        recognition.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    callback(event.results[i][0].transcript);
                }
            }
        };

        recognition.onend = function() {
            if(recognition.dontReTry === true) {
                return;
            }

            initTranscript(callback, language);
        };

        recognition.onerror = function(e) {
            if(e.error === 'audio-capture') {
                recognition.dontReTry = true;
                alert('Failed capturing audio i.e. microphone. Please check console-logs for hints to fix this issue.');
                console.error('No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly. https://support.google.com/chrome/bin/answer.py?hl=en&answer=1407892');
                console.error('Original', e.type, e.message.length || e);
                return;
            }

            console.error(e.type, e.error, e.message);
        };

        recognition.start();
    }

    var Google_Translate_API_KEY = 'AIzaSyBgXKqLkQViSS9Uq_KWE2xZJs7qzJlOz6A';
}
