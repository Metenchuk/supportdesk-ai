export default function TicketDetailSkeleton() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden animate-pulse">
            <div className="h-11 border-b border-border flex items-center px-3 gap-2 flex-shrink-0">
                <div className="h-3 w-16 bg-bg-hover rounded" />
                <div className="h-7 w-20 bg-bg-hover rounded-md" />
                <div className="h-7 w-20 bg-bg-hover rounded-md" />
            </div>
            <div className="flex-1 px-6 py-5">
                <div className="h-6 w-2/3 bg-bg-hover rounded mb-4" />
                <div className="h-3 w-full bg-bg-hover rounded mb-2" />
                <div className="h-3 w-5/6 bg-bg-hover rounded mb-2" />
                <div className="h-3 w-3/4 bg-bg-hover rounded" />
            </div>
        </div>
    )
}
