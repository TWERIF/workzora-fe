export default function CategoryThumb({ title }: { title: string }) {
    return (
        <div className="bg-bg-header dark:bg-bg-modalDark px-2 py-1 text-success rounded-20 text-center transition-colors">
            #{title}
        </div>
    )
}