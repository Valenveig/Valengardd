import { useEffect, useRef, useState } from 'react'

function Moodboard({
  references,
  onDeleteReference,
  onEditReference,
  onDropImage,
  onReorderReferences,
}) {
  const [referenceToDelete, setReferenceToDelete] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState('newest')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isDraggingImage, setIsDraggingImage] = useState(false)
  const [draggedReferenceId, setDraggedReferenceId] = useState(null)
  const [dragOverReferenceId, setDragOverReferenceId] = useState(null)
  const [selectedReference, setSelectedReference] = useState(null)

  const fileInputRef = useRef(null)

  const categories = [
    'All',
    ...new Set(
      references
        .map((reference) => reference.category)
        .filter(Boolean),
    ),
  ]

  const sortOptions = [
    {
      value: 'manual',
      label: 'Manual order',
    },
    {
      value: 'newest',
      label: 'Newest first',
    },
    {
      value: 'oldest',
      label: 'Oldest first',
    },
    {
      value: 'az',
      label: 'A → Z',
    },
    {
      value: 'za',
      label: 'Z → A',
    },
  ]

  const selectedSortLabel =
    sortOptions.find(
      (option) => option.value === sortOrder,
    )?.label || 'Newest first'

  const filteredReferences = references.filter((reference) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      reference.category === selectedCategory

    const search = searchTerm.toLowerCase()

    const matchesSearch =
      reference.title.toLowerCase().includes(search) ||
      reference.category.toLowerCase().includes(search) ||
      reference.description.toLowerCase().includes(search)

    return matchesCategory && matchesSearch
  })

  const sortedReferences = [...filteredReferences].sort(
    (a, b) => {
      if (sortOrder === 'manual') {
        return 0
      }

      if (sortOrder === 'newest') {
        return b.id.localeCompare(a.id)
      }

      if (sortOrder === 'oldest') {
        return a.id.localeCompare(b.id)
      }

      if (sortOrder === 'az') {
        return a.title.localeCompare(b.title)
      }

      if (sortOrder === 'za') {
        return b.title.localeCompare(a.title)
      }

      return 0
    },
  )

  function handleDelete() {
    onDeleteReference(referenceToDelete.id)
    setReferenceToDelete(null)
  }

  function handleCategorySelect(category) {
    setSelectedCategory(category)
    setIsCategoryOpen(false)
  }

  function handleSortSelect(sort) {
    setSortOrder(sort)
    setIsSortOpen(false)
  }

  function handleOpenFilePicker(event) {
    event.stopPropagation()

    fileInputRef.current?.click()
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]

    if (!file || !file.type.startsWith('image/')) {
      return
    }

    onDropImage(file)

    event.target.value = ''
  }

  function handleDragEnter(event) {
    event.preventDefault()

    if (references.length === 0) {
      setIsDraggingImage(true)
    }
  }

  function handleDragOver(event) {
    event.preventDefault()

    if (references.length === 0) {
      event.dataTransfer.dropEffect = 'copy'
      setIsDraggingImage(true)
    }
  }

  function handleDragLeave(event) {
    event.preventDefault()

    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDraggingImage(false)
    }
  }

  function handleDrop(event) {
    event.preventDefault()
    event.stopPropagation()

    setIsDraggingImage(false)

    if (references.length > 0) {
      return
    }

    const file = event.dataTransfer.files?.[0]

    if (!file || !file.type.startsWith('image/')) {
      return
    }

    onDropImage(file)
  }

  function handleReferenceDragStart(event, referenceId) {
    setDraggedReferenceId(referenceId)

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData(
      'text/plain',
      referenceId,
    )
  }

  function handleReferenceDragOver(event, referenceId) {
    event.preventDefault()
    event.stopPropagation()

    if (
      draggedReferenceId &&
      draggedReferenceId !== referenceId
    ) {
      event.dataTransfer.dropEffect = 'move'
      setDragOverReferenceId(referenceId)
    }
  }

  function handleReferenceDrop(event, targetId) {
    event.preventDefault()
    event.stopPropagation()

    const sourceId =
      event.dataTransfer.getData('text/plain') ||
      draggedReferenceId

    if (sourceId && sourceId !== targetId) {
      onReorderReferences(sourceId, targetId)

      setSortOrder('manual')
    }

    setDraggedReferenceId(null)
    setDragOverReferenceId(null)
  }

  function handleReferenceDragEnd() {
    setDraggedReferenceId(null)
    setDragOverReferenceId(null)
  }

  function handleOpenLightbox(reference) {
    setSelectedReference(reference)
  }

  function handleCloseLightbox() {
    setSelectedReference(null)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setReferenceToDelete(null)
        setIsCategoryOpen(false)
        setIsSortOpen(false)
        setIsDraggingImage(false)
        setDraggedReferenceId(null)
        setDragOverReferenceId(null)
        setSelectedReference(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.category-filter')) {
        setIsCategoryOpen(false)
      }

      if (!event.target.closest('.sort-filter')) {
        setIsSortOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [])

  useEffect(() => {
    if (selectedReference) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedReference])

  return (
    <section className="moodboard">
      <div className="moodboard-header">
        <div>
          <span className="eyebrow">Your collection</span>

          <h2>Visual references</h2>
        </div>

        <span className="reference-count">
          {filteredReferences.length}{' '}
          {filteredReferences.length === 1
            ? 'reference'
            : 'references'}
        </span>
      </div>

      {references.length > 0 && (
        <div className="moodboard-controls">
          <div className="search-field">
            <label htmlFor="search-references">
              Search references
            </label>

            <input
              id="search-references"
              type="search"
              placeholder="Search by title, category or description..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="category-filter">
            <span className="category-filter-label">
              Filter by category
            </span>

            <button
              type="button"
              className={`category-trigger ${
                isCategoryOpen ? 'is-open' : ''
              }`}
              onClick={() =>
                setIsCategoryOpen((current) => !current)
              }
              aria-haspopup="listbox"
              aria-expanded={isCategoryOpen}
            >
              <span>
                {selectedCategory === 'All'
                  ? 'All categories'
                  : selectedCategory}
              </span>

              <span
                className="category-trigger-icon"
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {isCategoryOpen && (
              <div
                className="category-menu"
                role="listbox"
                aria-label="Filter by category"
              >
                {categories.map((category) => {
                  const isSelected =
                    category === selectedCategory

                  return (
                    <button
                      key={category}
                      type="button"
                      className={`category-option ${
                        isSelected ? 'is-selected' : ''
                      }`}
                      onClick={() =>
                        handleCategorySelect(category)
                      }
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>
                        {category === 'All'
                          ? 'All categories'
                          : category}
                      </span>

                      {isSelected && (
                        <span
                          className="category-option-check"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="sort-filter">
            <span className="sort-filter-label">
              Sort by
            </span>

            <button
              type="button"
              className={`sort-trigger ${
                isSortOpen ? 'is-open' : ''
              }`}
              onClick={() =>
                setIsSortOpen((current) => !current)
              }
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
            >
              <span>{selectedSortLabel}</span>

              <span
                className="sort-trigger-icon"
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {isSortOpen && (
              <div
                className="sort-menu"
                role="listbox"
                aria-label="Sort references"
              >
                {sortOptions.map((option) => {
                  const isSelected =
                    option.value === sortOrder

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`sort-option ${
                        isSelected ? 'is-selected' : ''
                      }`}
                      onClick={() =>
                        handleSortSelect(option.value)
                      }
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>{option.label}</span>

                      {isSelected && (
                        <span
                          className="sort-option-check"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {references.length === 0 ? (
        <div
          className={`empty-state ${
            isDraggingImage ? 'is-dragging' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="empty-state-file-input"
          />

          <div className="empty-state-content">
            <button
              type="button"
              className="empty-state-mark"
              onClick={handleOpenFilePicker}
              aria-label="Choose an image from your computer"
            >
              +
            </button>

            <h3>Your moodboard is empty</h3>

            <p>
              Add your first visual reference to start building
              your collection.
            </p>
          </div>
        </div>
      ) : sortedReferences.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <span
              className="empty-state-mark"
              aria-hidden="true"
            >
              +
            </span>

            <h3>No references found</h3>

            <p>Try another search or category.</p>
          </div>
        </div>
      ) : (
        <div className="reference-grid">
          {sortedReferences.map((reference) => {
            const isDragging =
              draggedReferenceId === reference.id

            const isDragOver =
              dragOverReferenceId === reference.id

            return (
              <article
                className={`reference-card ${
                  isDragging ? 'is-dragging' : ''
                } ${
                  isDragOver ? 'is-drag-over' : ''
                }`}
                key={reference.id}
                draggable
                onDragStart={(event) =>
                  handleReferenceDragStart(
                    event,
                    reference.id,
                  )
                }
                onDragOver={(event) =>
                  handleReferenceDragOver(
                    event,
                    reference.id,
                  )
                }
                onDrop={(event) =>
                  handleReferenceDrop(
                    event,
                    reference.id,
                  )
                }
                onDragEnd={handleReferenceDragEnd}
              >
                <button
                  type="button"
                  className="reference-image-button"
                  onClick={() =>
                    handleOpenLightbox(reference)
                  }
                  draggable="false"
                  aria-label={`Open ${reference.title}`}
                >
                  <img
                    src={reference.imageUrl}
                    alt={
                      reference.title || 'Image preview'
                    }
                    draggable="false"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        'none'
                    }}
                  />
                </button>

                <div className="reference-info">
                  <span>{reference.category}</span>

                  <h3>{reference.title}</h3>

                  <div className="reference-description">
                    <p>{reference.description}</p>
                  </div>

                  <div className="reference-actions">
                    <button
                      type="button"
                      draggable="false"
                      onClick={() =>
                        onEditReference(reference)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      draggable="false"
                      onClick={() =>
                        setReferenceToDelete(reference)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {referenceToDelete && (
        <div
          className="delete-overlay"
          onClick={() => setReferenceToDelete(null)}
        >
          <div
            className="delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <span className="eyebrow">
              Remove reference
            </span>

            <h3>Delete this reference?</h3>

            <p>
              You are about to remove{' '}
              <strong>
                {referenceToDelete.title}
              </strong>{' '}
              from your collection.
            </p>

            <div className="delete-actions">
              <button
                type="button"
                onClick={() =>
                  setReferenceToDelete(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
              >
                Delete reference
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedReference && (
        <div
          className="lightbox-overlay"
          onClick={handleCloseLightbox}
        >
          <div
            className="lightbox"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={handleCloseLightbox}
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="lightbox-image">
              <img
                src={selectedReference.imageUrl}
                alt={
                  selectedReference.title ||
                  'Reference preview'
                }
              />
            </div>

            <div className="lightbox-info">
              <span className="eyebrow">
                {selectedReference.category}
              </span>

              <h2>{selectedReference.title}</h2>

              <p>{selectedReference.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Moodboard