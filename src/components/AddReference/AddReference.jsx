import { useEffect, useState } from 'react'

function AddReference({
  onAddReference,
  onUpdateReference,
  onCancelEdit,
  referenceToEdit,
  droppedImage,
  onDroppedImageConsumed,
}) {
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!referenceToEdit) {
      return
    }

    setImageUrl(referenceToEdit.imageUrl)
    setTitle(referenceToEdit.title)
    setCategory(referenceToEdit.category)
    setDescription(referenceToEdit.description)
    setImageError(false)
    setImageLoaded(true)

    document.getElementById('add-reference').scrollIntoView({
      behavior: 'smooth',
    })
  }, [referenceToEdit])

  useEffect(() => {
    if (!droppedImage) {
      return
    }

    setImageUrl(droppedImage)
    setImageError(false)
    setImageLoaded(true)

    onDroppedImageConsumed()

    document.getElementById('add-reference').scrollIntoView({
      behavior: 'smooth',
    })
  }, [droppedImage, onDroppedImageConsumed])

  function handleSubmit(event) {
    event.preventDefault()

    if (!imageLoaded || imageError) {
      return
    }

    if (referenceToEdit) {
      onUpdateReference({
        id: referenceToEdit.id,
        imageUrl,
        title,
        category,
        description,
      })
    } else {
      onAddReference({
        imageUrl,
        title,
        category,
        description,
      })
    }

    setShowSuccess(true)

    setImageUrl('')
    setTitle('')
    setCategory('')
    setDescription('')
    setImageError(false)
    setImageLoaded(false)

    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  function handleCancel() {
    onCancelEdit()

    setImageUrl('')
    setTitle('')
    setCategory('')
    setDescription('')
    setImageError(false)
    setImageLoaded(false)
    setShowSuccess(false)
  }

  function handleClear() {
    setImageUrl('')
    setTitle('')
    setCategory('')
    setDescription('')
    setImageError(false)
    setImageLoaded(false)
    setShowSuccess(false)
  }

  function handleImageChange(event) {
    setImageUrl(event.target.value)
    setImageError(false)
    setImageLoaded(false)
  }

  const isDroppedImage = imageUrl.startsWith('data:image/')

  return (
    <section id="add-reference" className="add-reference">
      <div className="add-reference-header">
        <div>
          <span className="eyebrow">
            {referenceToEdit
              ? 'Edit collection'
              : 'Add to collection'}
          </span>

          <h2>
            {referenceToEdit
              ? 'Edit reference'
              : 'New reference'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="reference-form">
        <div className="form-field form-field-large">
          <label htmlFor="imageUrl">Image URL</label>

          <input
            id="imageUrl"
            type="url"
            placeholder="https://..."
            value={isDroppedImage ? '' : imageUrl}
            onChange={handleImageChange}
            required={!isDroppedImage}
          />

          {isDroppedImage && (
            <span className="local-image-message">
              Image added from your computer.
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>

          <input
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            placeholder="What inspires you about this reference?"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={!imageLoaded || imageError}
          >
            {referenceToEdit
              ? 'Save changes'
              : 'Add reference'}
          </button>

          {!referenceToEdit && (
            <button
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          )}

          {referenceToEdit && (
            <button
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {showSuccess && (
        <div className="form-success">
          ✓{' '}
          {referenceToEdit
            ? 'Reference updated successfully.'
            : 'Reference added successfully.'}
        </div>
      )}

      {imageUrl && (
        <div className="image-preview">
          <span className="eyebrow">Preview</span>

          {imageError ? (
            <div className="image-preview-error">
              <p>We couldn't load this image.</p>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Preview"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true)
                setImageLoaded(false)
              }}
            />
          )}
        </div>
      )}
    </section>
  )
}

export default AddReference