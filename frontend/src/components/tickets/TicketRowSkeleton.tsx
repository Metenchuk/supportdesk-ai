export default function TicketRowSkeleton() {
    return (
        <div className="flex flex-col gap-2 px-3 py-2.5 border-b border-border animate-pulse">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bg-hover" />
                <div className="h-3 w-12 bg-bg-hover rounded" />
                <div className="h-3 flex-1 bg-bg-hover rounded" />
            </div>
            <div className="flex items-center gap-2 pl-3.5">
                <div className="h-3 w-10 bg-bg-hover rounded" />
                <div className="h-3 w-14 bg-bg-hover rounded ml-auto" />
            </div>
        </div>
    )
}
