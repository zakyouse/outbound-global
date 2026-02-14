<?php
// messages.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/index.php"; // provides $pdo

// ✅ Allow JSON body (Axios)
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (is_array($data)) {
    $_POST = array_merge($_POST, $data);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    $action = $_POST['action'] ?? null;

    switch ($action) {
        case "toggle_read":
            toggleRead($pdo);
            break;

        case "delete":
            deleteMessage($pdo);
            break;

        default:
            storeMessage($pdo);
            break;
    }
} elseif ($method === "GET") {
    fetchMessages($pdo);
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

/**
 * STORE MESSAGE
 */
function storeMessage($pdo)
{
    if (
        empty($_POST['full_name']) ||
        empty($_POST['email']) ||
        empty($_POST['message'])
    ) {
        http_response_code(400);
        echo json_encode(["message" => "All fields are required"]);
        return;
    }

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid email address"]);
        return;
    }

    $stmt = $pdo->prepare("
        INSERT INTO messages (full_name, email, message)
        VALUES (?, ?, ?)
    ");

    $stmt->execute([
        $_POST['full_name'],
        $_POST['email'],
        $_POST['message']
    ]);

    echo json_encode(["message" => "Message sent successfully"]);
}

/**
 * FETCH MESSAGES
 */
function fetchMessages($pdo)
{
    $stmt = $pdo->query("
        SELECT id, full_name, email, message, created_at, is_read
        FROM messages
        ORDER BY created_at DESC
    ");

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

/**
 * TOGGLE READ / UNREAD
 */
function toggleRead($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Message ID required"]);
        return;
    }

    $stmt = $pdo->prepare("
        UPDATE messages
        SET is_read = NOT is_read
        WHERE id = ?
    ");

    $stmt->execute([$_POST['id']]);

    echo json_encode(["message" => "Message read status updated"]);
}

/**
 * DELETE MESSAGE
 */
function deleteMessage($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Message ID required"]);
        return;
    }

    $stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
    $stmt->execute([$_POST['id']]);

    echo json_encode(["message" => "Message deleted successfully"]);
}
