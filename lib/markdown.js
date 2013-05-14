var ejs = require('ejs'),
    markdown = require('markdown').markdown;
/**
 * EJS / Markdown filter
 */
ejs.filters.markdown = function(obj){
  return markdown.toHTML(obj);
}
