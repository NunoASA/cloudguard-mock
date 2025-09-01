
export const TicketModal = ({ showTicketModal } : { showTicketModal: boolean }) => {

  if (!showTicketModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-orange-500/50 rounded-lg p-6 cyber-glow-orange">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-orange-400 font-semibold">Creating Ticket...</p>
        </div>
      </div>
    </div>
  )
}