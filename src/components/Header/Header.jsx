function Header() {
  function handleScrollToForm() {
    document.getElementById('add-reference').scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <header className="header">
      <div>
        <span className="eyebrow">Creative workspace</span>
        <h1>Moodboard Studio</h1>
      </div>

      <button type="button" onClick={handleScrollToForm}>
        + Add reference
      </button>
    </header>
  )
}

export default Header