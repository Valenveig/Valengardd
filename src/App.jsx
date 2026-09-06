import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header/Header.jsx'
import Moodboard from './components/Moodboard/Moodboard.jsx'
import AddReference from './components/AddReference/AddReference.jsx'

function App() {
  const [references, setReferences] = useState(() => {
    const savedReferences = localStorage.getItem(
      'moodboard-references',
    )

    if (!savedReferences) {
      return []
    }

    const parsedReferences = JSON.parse(savedReferences)

    return parsedReferences.map((reference) => ({
      ...reference,
      id: reference.id || crypto.randomUUID(),
      isFavorite: reference.isFavorite || false,
    }))
  })

  const [referenceToEdit, setReferenceToEdit] = useState(null)
  const [droppedImage, setDroppedImage] = useState(null)

  useEffect(() => {
    localStorage.setItem(
      'moodboard-references',
      JSON.stringify(references),
    )
  }, [references])

  function handleAddReference(reference) {
    const referenceWithId = {
      ...reference,
      id: crypto.randomUUID(),
      isFavorite: false,
    }

    setReferences((currentReferences) => [
      ...currentReferences,
      referenceWithId,
    ])
  }

  function handleUpdateReference(updatedReference) {
    setReferences((currentReferences) =>
      currentReferences.map((reference) =>
        reference.id === updatedReference.id
          ? updatedReference
          : reference,
      ),
    )

    setReferenceToEdit(null)
  }

  function handleDeleteReference(id) {
    setReferences((currentReferences) =>
      currentReferences.filter(
        (reference) => reference.id !== id,
      ),
    )
  }

  function handleEditReference(reference) {
    setReferenceToEdit(reference)
  }

  function handleCancelEdit() {
    setReferenceToEdit(null)
  }

  function handleToggleFavorite(id) {
    setReferences((currentReferences) =>
      currentReferences.map((reference) =>
        reference.id === id
          ? {
              ...reference,
              isFavorite: !reference.isFavorite,
            }
          : reference,
      ),
    )
  }

  function handleDropImage(file) {
    if (!file || !file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      setDroppedImage(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  function handleDroppedImageConsumed() {
    setDroppedImage(null)
  }

  function handleReorderReferences(sourceId, targetId) {
    setReferences((currentReferences) => {
      const sourceIndex = currentReferences.findIndex(
        (reference) => reference.id === sourceId,
      )

      const targetIndex = currentReferences.findIndex(
        (reference) => reference.id === targetId,
      )

      if (sourceIndex === -1 || targetIndex === -1) {
        return currentReferences
      }

      const reorderedReferences = [...currentReferences]

      const [movedReference] =
        reorderedReferences.splice(sourceIndex, 1)

      reorderedReferences.splice(
        targetIndex,
        0,
        movedReference,
      )

      return reorderedReferences
    })
  }

  return (
    <main>
      <Header />

      <AddReference
        onAddReference={handleAddReference}
        onUpdateReference={handleUpdateReference}
        onCancelEdit={handleCancelEdit}
        referenceToEdit={referenceToEdit}
        droppedImage={droppedImage}
        onDroppedImageConsumed={handleDroppedImageConsumed}
      />

      <Moodboard
        references={references}
        onDeleteReference={handleDeleteReference}
        onEditReference={handleEditReference}
        onDropImage={handleDropImage}
        onReorderReferences={handleReorderReferences}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  )
}

export default App