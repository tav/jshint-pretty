// Released into the Public Domain by tav <tav@espians.com>

var chalk = require('chalk');

function plural(term, count) {
  if (count === 1) {
    return '1 ' + term;
  }
  return count + ' ' + term + 's';
}

module.exports = {
  reporter: function(items, config, options) {

    var count = '',
        err,
        errors = 0,
        i,
        item,
        l = items.length,
        line,
        out = [],
        prev,
        reason,
        verbose = options.verbose,
        warnings = 0;

    if (!l) {
      console.log(chalk.green.bold('✔') + '  PASS');
      return;
    }

    for (i = 0; i < l; i++) {
      item = items[i];
      if (item.file !== prev) {
        prev = item.file;
        console.log(chalk.bold.underline(prev));
      }
      err = item.error;
      if (err.code[0] === 'E') {
        errors++;
      } else {
        warnings++;
      }
      reason = err.reason;
      if (verbose) {
        reason += '(' + err.code + ')';
      }
      console.log('');
      console.log(chalk.red.bold('  line ' + err.line + ', char ' + err.character + ': ') + reason);
      if (err.evidence) {
        console.log('  ' + err.evidence.trim());
      }
    }

    if (errors > 0) {
      count += ' · ' + plural("Error", errors);
    }

    if (warnings > 0) {
      count += ' · ' + plural("Warning", warnings);
    }

    console.log('');
    console.log(chalk.red.bold('✘') + '  FAIL' + count);

  }
};
