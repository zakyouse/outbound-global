<?php
// login.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/index.php"; // provides $pdo

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['action'])) {
    http_response_code(400);
    echo json_encode(["message" => "Action is required"]);
    exit;
}

switch ($data['action']) {
    case "register":
        registerUser($pdo, $data);
        break;

    case "login":
        loginUser($pdo, $data);
        break;

    case "change_password":
        changePassword($pdo, $data);
        break;

    default:
        http_response_code(400);
        echo json_encode(["message" => "Invalid action"]);
        break;
}

/**
 * CREATE ACCOUNT
 */
function registerUser($pdo, $data)
{
    if (
        empty($data['full_name']) ||
        empty($data['email']) ||
        empty($data['password'])
    ) {
        http_response_code(400);
        echo json_encode(["message" => "All fields are required"]);
        return;
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid email"]);
        return;
    }

    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("
            INSERT INTO users (full_name, email, password)
            VALUES (?, ?, ?)
        ");

        $stmt->execute([
            $data['full_name'],
            $data['email'],
            $hashedPassword
        ]);

        echo json_encode(["message" => "Account created successfully"]);
    } catch (PDOException $e) {
        http_response_code(409);
        echo json_encode(["message" => "Email already exists"]);
    }
}

/**
 * LOGIN
 */
function loginUser($pdo, $data)
{
    if (empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(["message" => "Email and password required"]);
        return;
    }

    $stmt = $pdo->prepare("
        SELECT id, full_name, email, password
        FROM users
        WHERE email = ?
        LIMIT 1
    ");
    $stmt->execute([$data['email']]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($data['password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(["message" => "Invalid credentials"]);
        return;
    }

    echo json_encode([
        "message" => "Login successful",
        "user" => [
            "id" => $user['id'],
            "full_name" => $user['full_name'],
            "email" => $user['email']
        ]
    ]);
}

/**
 * CHANGE PASSWORD
 */
function changePassword($pdo, $data)
{
    if (
        empty($data['email']) ||
        empty($data['old_password']) ||
        empty($data['new_password'])
    ) {
        http_response_code(400);
        echo json_encode(["message" => "All fields are required"]);
        return;
    }

    $stmt = $pdo->prepare("
        SELECT password FROM users WHERE email = ?
    ");
    $stmt->execute([$data['email']]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($data['old_password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(["message" => "Old password is incorrect"]);
        return;
    }

    $newHashedPassword = password_hash($data['new_password'], PASSWORD_BCRYPT);

    $update = $pdo->prepare("
        UPDATE users SET password = ? WHERE email = ?
    ");
    $update->execute([$newHashedPassword, $data['email']]);

    echo json_encode(["message" => "Password updated successfully"]);
}
