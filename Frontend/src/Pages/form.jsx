
const form = () => {
  return (
    <div className="mt-44">
        <form action='/upload' method='POST' encType='multipart/form-data'>
            <input type="file" name='product' />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default form