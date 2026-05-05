

export const Description = ({ description }: { description: string }) => {
  return (
    <div>
      <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  )
}
