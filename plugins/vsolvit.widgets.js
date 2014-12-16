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

  freeboard.loadWidgetPlugin({
    "type_name"   : "vsolvit_widget_site_status",
    "display_name": "Site Status Widget",
        "description" : "Checks if a site is up when called.",
        "external_scripts": [],
    "fill_size" : false,
    "settings"    : [
      {
        "name"        : "site_name",
        "display_name": "Site: ",
        "type"        : "calculated"
      },
      {
        "name"        : "site_status",
        "display_name": "Status: ",
        "type"        : "calculated"
      }
    ],
    newInstance   : function(settings, newInstanceCallback)
    {
      newInstanceCallback(new vsolvitWidgetSiteStatus(settings));
    }
  });

  var vsolvitWidgetSiteStatus = function(settings)
  {
    var self = this;
    var currentSettings = settings;
    var status = $('<p>'+currentSettings.site_name+': <strong>'+currentSettings.site_status+'</strong></p>');
    self.render = function(containerElement)
    {
      $(containerElement).append(status);
    }
    self.getHeight = function()
    {
      if(currentSettings.size == "big")
      {
        return 2;
      }
      else
      {
        return 1;
      }
    }
    self.onSettingsChanged = function(newSettings)
    {
      currentSettings = newSettings;
    }
    self.onCalculatedValueChanged = function(settingName, newValue)
    {
    if(settingName == "site_status")
      {
        $(status).html(newValue);
      }
    }
    self.onDispose = function()
    {
    }
  }
}());
