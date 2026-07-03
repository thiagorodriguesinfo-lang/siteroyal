import { useRef } from 'react'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

interface Props {
  files: File[]
  onChange: (files: File[]) => void
  onError: (msg: string) => void
}

export default function ComplaintUpload({ files, onChange, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || [])
    const valid: File[] = []

    for (const f of selected) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        onError(`"${f.name}" tem formato não suportado. Use PDF, JPG, JPEG ou PNG.`)
        continue
      }
      if (f.size > MAX_SIZE) {
        onError(`"${f.name}" excede o limite de 10 MB.`)
        continue
      }
      valid.push(f)
    }

    if (valid.length) onChange([...files, ...valid])
    if (inputRef.current) inputRef.current.value = ''
  }

  function removeFile(idx: number) {
    onChange(files.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <label
        htmlFor="complaint-upload-input"
        className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-vinho-400 hover:bg-vinho-50 transition-all"
      >
        <Upload size={24} className="text-gray-400" aria-hidden="true" />
        <span className="text-sm text-gray-500">Clique para anexar arquivos</span>
        <span className="text-xs text-gray-400">PDF, JPG, JPEG ou PNG — até 10 MB cada, múltiplos arquivos</span>
        <input
          id="complaint-upload-input"
          ref={inputRef}
          type="file"
          className="sr-only"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleSelect}
          aria-describedby="complaint-upload-hint"
        />
      </label>
      <span id="complaint-upload-hint" className="sr-only">
        Anexe arquivos PDF, JPG, JPEG ou PNG de até 10 megabytes cada
      </span>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}
              className="flex items-center gap-3 p-3 bg-verde-50 border border-verde-200 rounded-xl">
              {f.type === 'application/pdf'
                ? <FileText size={16} className="text-verde-700 flex-shrink-0" />
                : <ImageIcon size={16} className="text-verde-700 flex-shrink-0" />}
              <span className="text-sm text-verde-800 font-medium flex-1 truncate">{f.name}</span>
              <span className="text-xs text-verde-600 flex-shrink-0">
                {(f.size / 1024 / 1024).toFixed(1)} MB
              </span>
              <button type="button" onClick={() => removeFile(i)}
                aria-label={`Remover ${f.name}`}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
