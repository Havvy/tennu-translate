var translation_api = require('google-translate');

module.exports = function (tennu) {
    var config = tennu.config('translate');
    var api = translate_api(config['api-key']);

    var translate = function (channel, from, to, phrase) {
        var onResponse = function (err, translation) {
            tennu.say(channel, err ? config['error-message'] : translation);
        };

        if (from[0] === '?') {
            api.translate(phrase, to, onResponse)
        } else {
            api.translate(phrase, from, to, onResponse);
        }
    };

    return {
        dependencies: [],
        exports: {
            help: {
                translate: [
                    "Translate a phrase from one language to another.",
                    "",
                    "Syntax: translate <from> <to> <phase>",
                    "Example: translate Spanish English Hola. Cuesta el burrito?",
                    "Output: Hello. Costs the burrito?",
                    "",
                    "If you don't know what language it is from, use a question mark.",
                    "",
                    "See also: translateto, translatefrom"
                ],

                translateto: "As per `translate`, but the <from> field is assumed to be English."
                translatefrom: "As per `translate`, but the <to> field is assumed to be English."
            };
        },
        handlers: {
            "!translate" : function (command) {
                translate(command.channel, command.args[0], command.args[1], command.args.slice(2).join(" "));
            },

            "!translateto" : function (command) {
                translate(command.channel, config['from-language'], command.args[0], command.args.slice(1).join(" "));
            },

            "!translatefrom" : function (command) {
                translate(command.channel, command.args[0], config['to-language'], command.args.slice(1).join(" "));
            }
        }
    };
};