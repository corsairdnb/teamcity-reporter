"use strict";

/*
 *
 * Suite is kind of testing.
 * This suite is for testing redirects.
 *
 * alpha-blog != rc-blog != prod-blog
 * So, we can't test anything!
 *
 * */

(function(){

    function escapeTeamcityString(message) {
        if (!message) {
            return "";
        }

        return message.replace(/\|/g, "||")
            .replace(/\'/g, "|\'")
            .replace(/\n/g, "|n")
            .replace(/\r/g, "|r")
            .replace(/\u0085/g, "|x")
            .replace(/\u2028/g, "|l")
            .replace(/\u2029/g, "|p")
            .replace(/\[/g, "|[")
            .replace(/\]/g, "|]");
    }

    var output = [];

    // example data
    var errors = [
        {
            name: escapeTeamcityString('Wrong redirect: /blog/some-url/'),
            message: escapeTeamcityString('301' + ": " + 'wrong redirect from ' + '/blog/some-url/'),
            details: escapeTeamcityString('details!!!!!!'),
            expected: escapeTeamcityString('/blog/some-url-2/'),
            actual: escapeTeamcityString('/blog/some-url-3/')
        },
        {
            name: escapeTeamcityString('Wrong response code: /blog/url/'),
            message: escapeTeamcityString('404' + ": " + 'wrong response code on ' + '/blog/url/'),
            details: escapeTeamcityString('details 22222 !!!!!!'),
            expected: escapeTeamcityString('301 response code'),
            actual: escapeTeamcityString('here would be http response body')
        }
    ];

    var suite = "Redirects tester";

    // test suite started
    output.push("##teamcity[testSuiteStarted name='" + suite + "']");

    errors.forEach(function (test) {

        // test started
        output.push("##teamcity[testStarted name='" + test.name + "']");

        // test failed
        if (true) {
            output.push("##teamcity[testFailed " +
                "name='" + test.name + "' " +
                "message='" + test.message + "' " +
                "details='" + test.details + "' " +
                "type='comparisonFailure' " +
                "expected='" + test.expected + "' " +
                "actual='" + test.actual + "'" +
            "]");
        }

        // test finished
        output.push("##teamcity[testFinished name='" + test.name + "']");
    });

    // test suite finished
    output.push("##teamcity[testSuiteFinished name='" + suite + "']");



    // If there were no output, tell TeamCity that tests ran successfully
    if (output.length === 0) {
        output.push("##teamcity[testStarted name='" + suite + "']");
        output.push("##teamcity[testFinished name='" + suite + "']");
    }



    // Print to process.stdout
    console.log(output.join("\n"));

}());