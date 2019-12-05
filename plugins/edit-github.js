function editInGithub(hook, vm) {
  hook.beforeEach((html) => {
    window.$docsify.editInGithubUrl = window.$docsify.editInGithubUrl || 'https://github.com';

    var basePath = window.$docsify.editInGithubUrl
    var url = basePath + vm.route.file;
    var editHtml = '[📝 Edit in Github](' + url + ')\n';
    return (
      editHtml +
      html +
      '\n----\n' +
      editHtml
    )    
  })
}

if (window) {
  window.$docsify = window.$docsify || {};

  // Add config object
  window.$docsify.editInGithub = window.$docsify.editInGithub || {};

  // Add plugin data
  window.$docsify.editInGithub.version = '1';

  // Init plugin
  window.$docsify.plugins = [].concat(
    editInGithub,
    (window.$docsify.plugins || [])
  )
}