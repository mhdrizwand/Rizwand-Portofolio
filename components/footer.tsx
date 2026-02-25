export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left lg:pl-16">
        <p className="font-serif text-lg italic text-primary">Rn</p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} M. Rizwan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
