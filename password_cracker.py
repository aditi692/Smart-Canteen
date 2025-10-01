import hashlib

def crack_passwords(hashed_file, wordlist_file, hash_type='md5'):
    """
    Attempts to crack passwords from a hash list using a wordlist.
    """
    
    cracked_passwords = {}
    
    # Load the hashes from the file
    print("[*] Loading hashes...")
    with open(hashed_file, 'r') as f:
        target_hashes = [line.strip() for line in f]
    print(f"[*] Loaded {len(target_hashes)} hashes.")
    
    # Load the wordlist
    print("[*] Loading wordlist...")
    with open(wordlist_file, 'r', encoding='utf-8', errors='ignore') as f:
        wordlist = [line.strip() for line in f]
    print(f"[*] Loaded {len(wordlist)} words.")
    
    print("\n[*] Starting cracking process...")
    
    # Iterate through the wordlist and compare hashes
    for word in wordlist:
        if not target_hashes:
            break
            
        # Select the hashing algorithm
        if hash_type == 'md5':
            hash_object = hashlib.md5(word.encode())

        else:
            print(f"[-] Unsupported hash type: {hash_type}")
            return None
        
        current_hash = hash_object.hexdigest()
        
        # Check if the generated hash matches any of the target hashes
        if current_hash in target_hashes:
            print(f"[+] HASH FOUND! Plaintext: '{word}' -> Hash: '{current_hash}'")
            cracked_passwords[current_hash] = word
            target_hashes.remove(current_hash) # Remove cracked hash to speed up the process
    
    print("\n[*] Cracking complete.")
    return cracked_passwords

if __name__ == "__main__":
    cracked_results = crack_passwords('hashed_passwords.txt', 'wordlist.txt', hash_type='md5')
    
    if cracked_results:
        print("\n--- Summary of Cracked Passwords ---")
        if cracked_results:
            for hash_val, plaintext in cracked_results.items():
                print(f"Hash: {hash_val}\nPassword: {plaintext}\n")
        else:
            print("No passwords were cracked with the provided wordlist.")