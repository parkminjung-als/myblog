import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const CommentWrite = () => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  return (
    <div>
        <form>
            <input type="text" value={user.name} readonly />
            <textarea name="comment" value={comment}></textarea>
    
        </form>
    </div>
  )
}

export default CommentWrite