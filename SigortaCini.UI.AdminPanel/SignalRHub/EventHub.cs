using Microsoft.AspNetCore.SignalR;

namespace SigortaCini.UI.AdminPanel.SignalRHub
{
    public class EventHub : Hub
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
