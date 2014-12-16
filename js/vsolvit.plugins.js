(function()
{
freeboard.loadDatasourcePlugin({
"type_name"   : "vsolvit_datasource_site_status",
    "display_name": "Site Status Datasource",
        "description" : "Checks if a site is up when called.",
        "external_scripts": ["file:///C:/Users/Noel/Documents/Freeboard/js/vsolvit.widgets.siteStatus.js"],
    "fill_size" : false,
    "settings"    : [
      {
        "name"        : "site_name",
        "display_name": "Site Name",
        "type"        : "text"
      },
      {
        "name"        : "site_url",
        "display_name": "URL",
        "type"        : "text"
      },
      {
        "name"         : "status_refresh_time",
        "display_name" : "Refresh Site Status",
        "type"         : "text",
        "description"  : "In milliseconds",
        "default_value": 5000
      }
    ],
    newInstance   : function(settings, newInstanceCallback, updateCallback)
    {
      newInstanceCallback(new vsolvitWidgetSiteStatus(settings));
    }
  });

  var vsolvitDatasourceSiteStatus = function(settings, updateCallback)
  {
    var self = this;
    var currentSettings = settings;
    var refreshTimer;
    function getData() 
    {
      var status = siteStatus(settings.settings.site_url, updateCallback(status));
    }
    function createRefreshTimer(interval)
    {
      if(refreshTimer)
      {
        clearInterval(refreshTimer);
      }
      refreshTimer = setInterval(function()
      {
        getData();
      }, interval);
    }
    self.onSettingsChanged = function(newSettings)
    {
      currentSettings = newSettings;
    }
    self.updateNow = function()
    {
      getData();
    }
    self.onDispose = function()
    {
      clearInterval(refreshTimer);
      refreshTimer = undefined;
    }
    createRefreshTimer(currentSettings.refresh_time);
  }
})
