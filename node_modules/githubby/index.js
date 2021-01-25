var GitHubby = 
{
	getUser: (gituser, then) =>
	{
		require('request')(`https://github.com/${gituser}`, function(error, response, body) 
		{
			
			var $ = require('cheerio').load(body);
			var person = 
			{
				name 			: $('*[itemprop="name"]').text(), 
				image			: $('*[itemprop="image"]').attr('href'), 
				worksFor		: $('*[itemprop="worksFor"]').text(), 
				homeLocation	: $('*[itemprop="homeLocation"]').text(),
				website			: $('*[itemprop="url"]').text(),  
				joined			: $('time[class="join-date"]').text()
			};
			
			then(person);
		});
	}, 

	getUserRepositories: (gituser, then) =>  
	{
		require('request')(`https://github.com/${gituser}?tab=repositories`, function(error, response, body) 
		{
			var repos = [];
			var $ = require('cheerio').load(body);
			$('*[itemprop="owns"]').each(function() 
			{	
				repos.push(
				{
					href: 'https://github.com' + $('a[itemprop="name codeRepository"]', $(this)).attr('href'), 
					text: $('p[itemprop="description"]', $(this)).text().trim()
				});
			});	
			
			then(repos);
		});
	},

	getUserFollowing: (gituser, then) =>  
	{
		require('request')(`https://github.com/${gituser}/following`, function(error, response, body) 
		{
			var following = [];
			var $ = require('cheerio').load(body);

			$('*[class="follow-list-item"]').each(function() 
			{
				following.push(
				{
					name 	: $('*[class="follow-list-name"]', $(this)).text(), 
					url		: 'https://github.com' + $('a', $(this)).attr('href'), 
					image	: $('img', $(this)).attr('src') 
				}); 
				
			})
			
			then(following);
		});
	}, 

	getUserFollowers: (gituser, then) => 
	{
		require('request')(`https://github.com/${gituser}/followers`, function(error, response, body) 
		{
			var followers = [];
			var $ = require('cheerio').load(body);

			$('*[class="follow-list-item"]').each(function() 
			{
				followers.push(
				{
					name 	: $('*[class="follow-list-name"]', $(this)).text(), 
					url 	: 'https://github.com' + $('a', $(this)).attr('href'), 
					image 	: $('img', $(this)).attr('src') 
				}); 
				
			});
			
			then(followers);
		});
	}, 

	searchRepositories: (query, language, then) =>  
	{
		var language = (typeof language == 'string') ? ('&l=' + language) : '';
		require('request')(`https://github.com/search?q=${query}&type=Repositories${language}`, function(error, response, body) 
		{
			var repositories = [];
			var $ = require('cheerio').load(body);

			$('li[class="repo-list-item public source"]').each(function()  
			{
				var repo_name = $('h3[class="repo-list-name"]', $(this)).html();
				repositories.push(
				{
					name 		: $('em', repo_name).text(), 
					href 		: 'https://github.com' + $('a', repo_name).attr('href'), 
					owner 		: $('a', repo_name).text().split('/')[0], 
					description : $('p[class="repo-list-description"]', $(this)).text().trim(), 
				});				
			});

			then(repositories);
		});
	}, 

	searchCode: (query, language, then) =>  
	{
		var language = (typeof language == 'string') ? ('&l=' + language) : '';
		require('request')(`https://github.com/search?q=${query}&type=Code${language}`, function(error, response, body) 
		{
			var results = [];
			var $ = require('cheerio').load(body);
			var code_list = $('.code-list');

			$('div', code_list).each(function()  
			{
				var repo_a = $('.title', $(this)).children('a').eq(0).text().trim();
				var result = 
				{
					repository 	: repo_a.split('/')[1],
					owner 		: repo_a.split('/')[0],  
					file 		: $('.title', $(this)).children('a').eq(1).attr('title'), 
					href 		: 'https://github.com' + $('.title', $(this)).children('a').eq(1).attr('href')
				}
				if (typeof result.repository != 'undefined' && typeof result.owner != 'undefined' && typeof result.file != 'undefined')
				{
					results.push(result);
				}				
			});

			then(results);
		});
	},

	searchUsers: (query, then) =>  
	{
		require('request')(`https://github.com/search?q=${query}&type=Users`, function(error, response, body) 
		{
			var users = [];
			var $ = require('cheerio').load(body);
			var len = $('.user-list-item').length;

			$('.user-list-item').each(function()  
			{
				var username = $(this).children('a').eq(0).attr('href').replace('/', '');
				GitHubby.getUser(username, function(user) 
				{
					users.push(user);
					if (users.length == len)
					{
						then(users);
					} 
				});
			});
		});
	}, 
};

module.exports = GitHubby;